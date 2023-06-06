import Combine
import ExpoModulesCore
import Foundation
import React

enum ImageLoadingError: Error {
    case noImageLoaded
}

class EmitterImageLoader {
    let imageLoader: RCTImageLoader
    
    var cancellables = Set<AnyCancellable>()
    
    init(rctImageLoader: RCTImageLoader) {
        imageLoader = rctImageLoader
    }
    
    private func gatherImageSources(cellConfigs: [CellConfig]?) -> Set<String> {
        guard let cellConfigs, cellConfigs.count != 0 else { return Set() }

        var finalSet = Set<String>()
        var cellsToCheck: [CellConfig] = cellConfigs

        while cellsToCheck.count > 0 {
            let cell = cellsToCheck.removeFirst()

            if let imageContents = cell.imageContents {
                finalSet.insert(imageContents.uri)
            }

            if let moreCells = cell.emitterCells {
                cellsToCheck.append(contentsOf: moreCells)
            }
        }

        return finalSet
    }
    
    public func loadImagesFor(cellConfigs: [CellConfig]?, completion: @escaping ([String: UIImage]) -> Void) {
        // drop any requests in progress
        cancellables = Set()
        
        let imageSources = gatherImageSources(cellConfigs: cellConfigs)
        
        guard !imageSources.isEmpty else {
            completion([:])
            return
        }
        
        try? loadImagesAsync(images: imageSources, completion: completion)
    }
    
    private func loadImagesAsync(images: Set<String>, completion: @escaping ([String: UIImage]) -> Void) throws {
        let futures = try images.map { uri in
            guard let url = URL(string: uri) else {
                throw GenericException("Error creating URL from URI string")
            }
            
            return AnyPublisher(Future<(String, UIImage), Error> { [weak self] promise in
                self?.imageLoader.loadImage(with: URLRequest(url: url)) { error, image in
                    guard let image = image else {
                        promise(.failure(error ?? ImageLoadingError.noImageLoaded))
                        return
                    }
                    
                    promise(.success((uri, image)))
                }
            })
        }
        
        Publishers.MergeMany(futures).collect().sink(receiveCompletion: { completion in
            switch completion {
            case .finished:
                // no-op
                break
            case .failure(let err):
                // TODO: what to do if there's an error..?
                print(err)
            }
        }, receiveValue: { images in
            let imageMap: [String: UIImage] = images.reduce(into: [:]) { result, tuple in
                let (key, value) = tuple
                result[key] = value
            }
    
            completion(imageMap)
        }).store(in: &cancellables)
    }
}
