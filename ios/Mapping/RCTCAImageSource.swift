import ExpoModulesCore
import Foundation

struct RCTCAImageSource: Record {
    @Field
    var width: Double = 0.0

    @Field
    var height: Double = 0.0

    @Field
    var uri: URL? = nil

    @Field
    var scale: Double = 1.0
}

struct DecodableRCTCAImageSource: Decodable {
    let width: Double

    let height: Double

    let uri: String

    let scale: Double
}
