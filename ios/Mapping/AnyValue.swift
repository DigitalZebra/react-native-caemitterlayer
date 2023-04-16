import Foundation

enum AnyValue: Decodable {
    case number(Double), string(String)

    init(from decoder: Decoder) throws {
        if let numValue = try? decoder.singleValueContainer().decode(Double.self) {
            self = .number(numValue)
            return
        }

        if let stringValue = try? decoder.singleValueContainer().decode(String.self) {
            self = .string(stringValue)
            return
        }

        throw AnyValueError.missingValue
    }

    var anyValue: Any {
        switch self {
        case let .number(n):
            return n
        case let .string(s):
            return s
        }
    }

    enum AnyValueError: Error {
        case missingValue
    }
}
