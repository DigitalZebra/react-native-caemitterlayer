import Foundation

struct Helpers {
    static func testCell() -> CAEmitterCell {
        UIGraphicsBeginImageContextWithOptions(CGSize(width: 20, height: 20), false, 0)
        let ctx = UIGraphicsGetCurrentContext()!
        ctx.saveGState()
        
        let rect = CGRect(x: 0, y: 0, width: 20, height: 20)
        ctx.setFillColor(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.5).cgColor)
        ctx.fillEllipse(in: rect)
        
        ctx.restoreGState()
        let img = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        
        let c = CAEmitterCell()
        c.velocity = 10
        c.emissionLongitude = .pi / 2
        c.emissionLatitude = .pi / 2
        c.birthRate = 10
        c.lifetime = 1.4
        c.lifetimeRange = 0.1
        c.velocity = 32
        c.velocityRange = 6
        c.emissionRange = 0
        c.yAcceleration = -60
        c.xAcceleration = -30
        c.scaleSpeed = -0.2
        
        if #available(iOS 13.0, *) {
            c.color = CGColor(red: 0.1, green: 0.4, blue: 0.2, alpha: 0.1)
        }
        
        c.contents = img.cgImage
        
        return c
    }
    
    func createImage() -> CGImage? {
        UIGraphicsBeginImageContextWithOptions(CGSize(width: 20, height: 20), false, 0)
        let ctx = UIGraphicsGetCurrentContext()!
        ctx.saveGState()
        
        let rect = CGRect(x: 0, y: 0, width: 20, height: 20)
        ctx.setFillColor(UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 0.5).cgColor)
        ctx.fillEllipse(in: rect)
        
        ctx.restoreGState()
        let img = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        
        return img.cgImage
    }
    
    static func createImage(from: String) -> CGImage? {
        let font = UIFont.systemFont(ofSize: 16.0)
        
        let string = NSString(string: from)
        let attributes: [NSAttributedString.Key: Any] = [
            .font: font
        ]
        let size = string.size(withAttributes: attributes)

        return UIGraphicsImageRenderer(size: size).image { _ in
            string.draw(at: .zero, withAttributes: attributes)
        }.cgImage
    }
}
