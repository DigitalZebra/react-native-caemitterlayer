import Foundation

struct ImageContentsValue: Decodable {
    let imageData: String
}

enum ConentsTypes: String, Codable {
    case string
    case image
}

enum ContentsValue: Decodable {
    case string(String)
    case image(ImageContentsValue)

    enum CodingKeys: String, CodingKey {
        case type_key = "type"
        case value_key = "value"
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        let contentType = try? container.decode(ConentsTypes.self, forKey: .type_key)

        guard let contentType = contentType else {
            throw ContentsValueError.unsupportedType
        }

        switch contentType {
        case .string:
            self = .string(try container.decode(String.self, forKey: .value_key))
        case .image:
            self = .image(try container.decode(ImageContentsValue.self, forKey: .value_key))
        }
    }

    enum ContentsValueError: Error {
        case unsupportedType
    }
}
