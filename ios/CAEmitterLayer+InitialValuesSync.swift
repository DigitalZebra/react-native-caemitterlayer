import ExpoModulesCore
import Foundation

protocol InitialValuesSync {
    func syncInitialValues(values: InitialLayerValues)
}

extension CAEmitterLayer {
    func syncInitialValues(values: InitialLayerValues) throws {
        if let seed = values.seed {
            self.seed = seed
        }
        
        if let beginTime = values.beginTime {
            switch beginTime {
            case let .number(d):
                self.beginTime = d
            case let .string(s):
                switch s {
                case "currentTime":
                    self.beginTime = CACurrentMediaTime()
                default:
                    throw LayerException(field: "beginTime")
                }
            }
        }
        
        if let timeOffset = values.timeOffset {
            self.timeOffset = timeOffset
        }
        
        if let repeatCount = values.repeatCount {
            self.repeatCount = repeatCount
        }
        
        if let repeatDuration = values.repeatDuration {
            self.repeatDuration = repeatDuration
        }
        
        if let autoreverses = values.autoreverses {
            self.autoreverses = autoreverses
        }
        
        if let fillMode = values.fillMode {
            self.fillMode = CAMediaTimingFillMode(rawValue: fillMode)
        }
        
        if let speed = values.speed {
            self.speed = speed
        }
        
        if let duration = values.duration {
            self.duration = duration
        }
    }
}

internal class LayerException: Exception {
    var field: String?
    
    convenience init(field: String) {
        self.init()
    }
    
    override var reason: String {
        let extra: String
        
        if let field = field {
            extra = "Field: \(field)"
        }
        else {
            extra = ""
        }
                
        return "Error mapping layer configuration to CAEmitterLayer. \(extra)"
    }
}
