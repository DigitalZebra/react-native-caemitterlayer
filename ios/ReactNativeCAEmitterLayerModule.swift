import ExpoModulesCore

public class ReactNativeCAEmitterLayerModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ReactNativeCAEmitterLayer")

        View(ReactNativeCAEmitterLayerView.self) {
            Prop("config") { (view: ReactNativeCAEmitterLayerView, prop: EmitterConfiguration) in
                // TODO: what's a better way to re-throw errors...?
                do {
                    try view.setCellConfig(config: prop)
                }
                catch {
                    print("\(error)")
                }
            }
        }
    }
}
