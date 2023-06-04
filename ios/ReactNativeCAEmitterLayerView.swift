import ExpoModulesCore
import Foundation
import React

class ReactNativeCAEmitterLayerView: ExpoView {
    var isEmitting: Bool = false
    var emitterImageLoader: EmitterImageLoader?
    
    private let emitter: CAEmitterLayer = {
        let emitterLayer = CAEmitterLayer()
        
        return emitterLayer
    }()

    func setUpEmitter() {
        layer.addSublayer(emitter)
    }
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        
        let imageLoader = appContext?.reactBridge?.module(for: RCTImageLoader.self) as? RCTImageLoader
        if let imageLoader {
            emitterImageLoader = EmitterImageLoader(rctImageLoader: imageLoader)
        }
        
        setUpEmitter()
    }
    
    func recursivelyMapCells(cellConfigs: [CellConfig]?, images: [String: UIImage]? = nil) -> [CAEmitterCell]? {
        guard let cellConfigs, cellConfigs.count != 0 else { return nil }
        
        let mappedCells = cellConfigs.map { (cellConfig: CellConfig) in
            let cell = CAEmitterCell()
            cell.isEnabled = cellConfig.isEnabled
                
            cell.contentsScale = cellConfig.contentsScale
            
            cell.emissionLatitude = cellConfig.emissionLatitude
            cell.emissionLongitude = cellConfig.emissionLongitude
            cell.emissionRange = cellConfig.emissionRange
                
            cell.redRange = cellConfig.redRange
            cell.greenRange = cellConfig.greenRange
            cell.blueRange = cellConfig.blueRange
            cell.alphaRange = cellConfig.alphaRange

            cell.redSpeed = cellConfig.redSpeed
            cell.greenSpeed = cellConfig.greenSpeed
            cell.blueSpeed = cellConfig.blueSpeed
            cell.alphaSpeed = cellConfig.alphaSpeed

            cell.scale = cellConfig.scale
            cell.scaleRange = cellConfig.scaleRange
            cell.scaleSpeed = cellConfig.scaleSpeed

            cell.spin = cellConfig.spin
            cell.spinRange = cellConfig.spinRange

            cell.lifetime = cellConfig.lifetime
            cell.lifetimeRange = cellConfig.lifetimeRange

            cell.birthRate = cellConfig.birthRate
            cell.velocity = cellConfig.velocity
            cell.velocityRange = cellConfig.velocityRange

            cell.xAcceleration = cellConfig.xAcceleration
            cell.yAcceleration = cellConfig.yAcceleration
            cell.zAcceleration = cellConfig.zAcceleration
            
            // CAMediaTiming properties - dangerous! check these, handle them differently
            if let beginTime = cellConfig.beginTime {
                cell.beginTime = beginTime
            }
             
            if let timeOffset = cellConfig.timeOffset {
                cell.timeOffset = timeOffset
            }
            
            if let repeatCount = cellConfig.repeatCount {
                cell.repeatCount = repeatCount
            }
            
            if let repeatDuration = cellConfig.repeatDuration {
                cell.repeatDuration = repeatDuration
            }
            
            if let autoReverses = cellConfig.autoreverses {
                cell.autoreverses = autoReverses
            }
            
            if let cellDuration = cellConfig.duration {
                cell.duration = cellDuration
            }
            
            if let speed = cellConfig.speed {
                cell.speed = speed
            }
            
            if let fillMode = cellConfig.fillMode {
                cell.fillMode = CAMediaTimingFillMode(rawValue: fillMode)
            }
            
            // TODO: don't silently fail here
            cell.color = try? CGColor.convert(from: cellConfig.color)
            
            cellConfig.values.forEach { x in
                cell.setValue(x.value.anyValue, forKey: x.key)
            }
            
            cell.emitterCells = recursivelyMapCells(cellConfigs: cellConfig.emitterCells)
            
            if let cellContents = cellConfig.contents {
                switch cellContents {
                case .string(let s):
                    cell.contents = Helpers.createImage(from: s)
                case .image(let imageData):
                    if let data = Data(base64Encoded: imageData.imageData), let image = UIImage(data: data) {
                        cell.contents = image.cgImage
                    }
                }
            }
            
            if cellConfig.imageData != "" {
                if let data = Data(base64Encoded: cellConfig.imageData), let image = UIImage(data: data) {
                    cell.contents = image.cgImage
                }
                else {
                    // TODO: throw specific error here...?
                }
            }
            
            if let source = cellConfig.imageSource, let images = images {
                cell.contents = images[source.uri]?.cgImage
            }
            
            return cell
        }
        
        return mappedCells
    }
    
    func setCellConfig(config: EmitterConfiguration) throws {
        let layer = config.layer
        
        emitter.velocity = layer.velocity
        emitter.scale = layer.scale
        emitter.spin = layer.spin
        emitter.lifetime = layer.lifetime
            
        emitter.renderMode = CAEmitterLayerRenderMode(rawValue: layer.renderMode)
        emitter.position = CGPoint(x: layer.emitterPosition.x, y: layer.emitterPosition.y)
        emitter.emitterZPosition = layer.emitterZPosition
        emitter.emitterDepth = layer.emitterDepth
            
        emitter.emitterMode = CAEmitterLayerEmitterMode(rawValue: layer.emitterMode)
        emitter.emitterShape = CAEmitterLayerEmitterShape(rawValue: layer.emitterShape)
        emitter.emitterSize = CGSize(width: layer.emitterSize.width, height: layer.emitterSize.height)
        
        emitterImageLoader?.loadImagesFor(cellConfigs: layer.emitterCells) { images in
            self.runOnMain {
                self.emitter.emitterCells = self.recursivelyMapCells(cellConfigs: layer.emitterCells, images: images)
            }
        }
        
        // If not emitting, and we want to emit, set initial values (if applicable)
        if !isEmitting, config.layer.enabled {
            emitter.birthRate = layer.birthRate
            try emitter.syncInitialValues(values: config.layer.initialValues)
        }
        else if !config.layer.enabled {
            emitter.birthRate = 0
        }
        else {
            // for updates
            emitter.birthRate = layer.birthRate
        }
        
        isEmitting = config.layer.enabled
    }
    
    private func runOnMain(execute: @escaping () -> Void) {
        if Thread.isMainThread {
            execute()
        }
        else {
            DispatchQueue.main.async(execute: execute)
        }
    }
}
