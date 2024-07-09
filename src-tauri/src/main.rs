// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//use search::search::SearchResults;
//mod search;

// Functions that can be "invoked" by the Tauri "invoke" -
// method on the frontend.
#[tauri::command]
fn topic_handler(input: &str) {
    // This is prototyping, remove the unwraps later and- 
    // deal with all cases later.
    println!("Test function.");
}

// Build Tauri commands.
fn main() {
    tauri::Builder::default()
        // add functions to invoke handler array.
        .invoke_handler(tauri::generate_handler![topic_handler])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
