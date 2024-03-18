import ExpoModulesCore
import Foundation

// An object that is Convertible from JSON
protocol JsonConvertible: Decodable, Convertible, AnyArgument {}

extension JsonConvertible {
    static func convert(from value: Any?, appContext: AppContext) throws -> Self {
        let vstring = value as? String

        guard let vstring else {
            throw ConversionException()
        }

        let d = Data(vstring.utf8)
        let r = try JSONDecoder().decode(Self.self, from: d)

        return r
    }
}

internal class ConversionException: Exception {
    override var reason: String {
        "Something went wrong hydrating module props."
    }
}
