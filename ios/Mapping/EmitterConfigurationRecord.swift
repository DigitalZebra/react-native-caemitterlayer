import ExpoModulesCore
import Foundation

struct EmitterConfigurationRecord: Record {
    @Field
    var layer: LayerConfigRecord
}

struct LayerConfigRecord: Record {
    @Field
    var initialValues: InitialLayerValuesRecord

    @Field
    var enabled: Bool = true

    @Field
    var scale: Float = 1.0

    @Field
    var spin: Float = 1.0

    @Field
    var velocity: Float = 1.0

    @Field
    var birthRate: Float = 1.0

    @Field
    var lifetime: Float = 1.0

    @Field
    var preservesDepth: Bool

    @Field
    var renderMode: CAEmitterLayerRenderMode = .unordered

    @Field
    var emitterZPosition: CGFloat

    @Field
    var emitterDepth: CGFloat

    @Field
    var emitterSize: SizeRecord

    @Field
    var emitterPosition: PositionRecord
    @Field
    var emitterMode: CAEmitterLayerEmitterMode = .volume
    @Field
    var emitterShape: CAEmitterLayerEmitterShape = .point
    @Field
    var emitterCells: [CellConfigRecord]
}

struct SizeRecord: Record {
    @Field
    var width: Double

    @Field
    var height: Double
}

struct PositionRecord: Record {
    @Field
    var x: Double
    @Field
    var y: Double
}

struct CellConfigRecord: Record {
    @Field
    var color: String = "white"

    @Field
    var imageData: String
    
    // TODO: DREW - Fix contents handling
//    let contents: ContentsValue?

    @Field
    var isEnabled: Bool = true

    @Field
    var contentsScale: CGFloat = 1.0
    @Field
    var emissionLatitude: CGFloat
    @Field
    var emissionLongitude: CGFloat
    @Field
    var emissionRange: CGFloat

    @Field
    var redRange: Float
    @Field
    var greenRange: Float
    @Field
    var blueRange: Float
    @Field
    var alphaRange: Float

    @Field
    var redSpeed: Float
    @Field
    var greenSpeed: Float
    @Field
    var blueSpeed: Float
    @Field
    var alphaSpeed: Float

    @Field
    var scale: CGFloat = 1.0
    @Field
    var scaleRange: CGFloat
    @Field
    var scaleSpeed: CGFloat

    @Field
    var spin: CGFloat
    @Field
    var spinRange: CGFloat

    @Field
    var lifetime: Float
    @Field
    var lifetimeRange: Float

    @Field
    var birthRate: Float

    @Field
    var velocity: CGFloat
    @Field
    var velocityRange: CGFloat
    @Field
    var xAcceleration: CGFloat
    @Field
    var yAcceleration: CGFloat
    @Field
    var zAcceleration: CGFloat

    // CAMediaTiming propertimes
    @Field
    var beginTime: Double?
    @Field
    var timeOffset: Double?
    @Field
    var repeatCount: Float?
    @Field
    var repeatDuration: Double?
    @Field
    var autoreverses: Bool?
    @Field
    var fillMode: String?
    @Field
    var speed: Float?
    @Field
    var duration: Double?

    @Field
    var values: [ValueRecord]

    @Field
    var emitterCells: [CellConfigRecord]?
}

// TODO: DREW - Move these to other files
struct ValueRecord: Record {
    @Field
    var key: String
    
    @Field
    var value: AnyValue = .number(0.0)
}

public extension Field where Type == Float {
    convenience init(wrappedValue: Type = 0.0) {
        self.init(wrappedValue: wrappedValue, [])
    }

    convenience init(wrappedValue: Type = 0.0, _ options: FieldOption...) {
        self.init(wrappedValue: wrappedValue, options)
    }
}

public extension Field where Type == CGFloat {
    convenience init(wrappedValue: Type = 0.0) {
        self.init(wrappedValue: wrappedValue, [])
    }

    convenience init(wrappedValue: Type = 0.0, _ options: FieldOption...) {
        self.init(wrappedValue: wrappedValue, options)
    }
}

// These could be problematic for other libraries perhaps...?
extension Float: Convertible {
    public static func convert(from value: Any?) throws -> Float {
        guard let f = value as? Double else {
            throw ConversionException()
        }

        return Float(f)
    }
}

extension CGFloat: Convertible {
    public static func convert(from value: Any?) throws -> CGFloat {
        guard let f = value as? Double else {
            throw ConversionException()
        }

        return CGFloat(f)
    }
}

extension AnyValue: Convertible {
    static func convert(from value: Any?) throws -> AnyValue {
        if let s = value as? String {
            return .string(s)
        }

        if let n = value as? Double {
            return .number(n)
        }

        throw AnyValueError.unsupportedValue
    }
}

struct InitialLayerValuesRecord: Record {
    @Field
    var seed: UInt32?

    // CAMediaTiming properties
    @Field
    var beginTime: AnyValue?

    @Field
    var timeOffset: Double?

    @Field
    var repeatCount: Float?

    @Field
    var repeatDuration: Double?

    @Field
    var autoreverses: Bool?

    @Field
    var fillMode: CAMediaTimingFillMode?

    @Field
    var speed: Float?

    @Field
    var duration: Double?
}
