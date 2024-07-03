// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn topic_handler(input: &str) -> String {
    // todo: do stuff with chosen topic.
    // google search
    // take top ten
    // return somehow

    format!("Showing results for {}...", input)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![topic_handler])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
