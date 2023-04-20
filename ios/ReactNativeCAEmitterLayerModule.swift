import ExpoModulesCore

public class ReactNativeCAEmitterLayerModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ReactNativeCAEmitterLayer")

        View(ReactNativeCAEmitterLayerView.self) {
            Prop("config") { (view: ReactNativeCAEmitterLayerView, prop: EmitterConfiguration) in
                do {
                    try view.setCellConfig(config: prop)
                }
                catch {
                    // TODO: is there an Expo way to re-throw these errors...?
                    print("\(error)")
                }
            }
        }
    }
}
