#[no_mangle] // Don't mangle the name of this function
pub extern "C" fn add(a: f64, b: f64) -> f64 {
    a + b
}