import Foundation

struct EmitterConfiguration: JsonConvertible {
    let layer: LayerConfig
}

struct LayerConfig: Decodable {
    let initialValues: InitialLayerValues
    let enabled: Bool

    let scale: Float
    let spin: Float
    let velocity: Float
    let birthRate: Float
    let lifetime: Float
    let preservesDepth: Bool

    let renderMode: String
    let emitterZPosition: CGFloat
    let emitterDepth: CGFloat
    let emitterSize: Size

    let emitterPosition: Position

    let emitterMode: String // todo - this needs to deserialize to an enum
    let emitterShape: String // todo - this needs to deserialize to an enum

    let emitterCells: [CellConfig]
}

struct Size: Decodable {
    let width: Double
    let height: Double
}

struct Position: Decodable {
    let x: Double
    let y: Double
}

struct InitialLayerValues: Decodable {
    let seed: UInt32?

    // CAMediaTiming properties
    let beginTime: AnyValue?
    let timeOffset: Double?
    let repeatCount: Float?
    let repeatDuration: Double?
    let autoreverses: Bool?
    let fillMode: String?
    let speed: Float?
    let duration: Double?
}

struct CellConfig: Decodable {
    
    // MARK: Contents types
    let imageData: String?
    let imageContents: DecodableRCTCAImageSource?
    let stringContents: StringContents?
    let contents: StringContents?
    
    let isEnabled: Bool
    
    let color: String
    
    let contentsScale: CGFloat

    let emissionLatitude: CGFloat
    let emissionLongitude: CGFloat
    let emissionRange: CGFloat

    let redRange: Float
    let greenRange: Float
    let blueRange: Float
    let alphaRange: Float

    let redSpeed: Float
    let greenSpeed: Float
    let blueSpeed: Float
    let alphaSpeed: Float

    let scale: CGFloat
    let scaleRange: CGFloat
    let scaleSpeed: CGFloat

    let spin: CGFloat
    let spinRange: CGFloat

    let lifetime: Float
    let lifetimeRange: Float

    let birthRate: Float

    let velocity: CGFloat
    let velocityRange: CGFloat

    let xAcceleration: CGFloat
    let yAcceleration: CGFloat
    let zAcceleration: CGFloat

    // CAMediaTiming propertimes
    let beginTime: Double?
    let timeOffset: Double?
    let repeatCount: Float?
    let repeatDuration: Double?
    let autoreverses: Bool?
    let fillMode: String?
    let speed: Float?
    let duration: Double?

    let values: [String: AnyValue]

    let emitterCells: [CellConfig]?
}
