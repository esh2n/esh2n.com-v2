use pulldown_cmark::{html, Options, Parser};
use regex::Regex;
use wasm_bindgen::prelude::*;

fn preprocess_callout_syntax(markdown: &str) -> String {
    let re = Regex::new(r"(?s):::(\w+)(?:\s+(.+?))?\n(.*?):::").unwrap();
    re.replace_all(markdown, |caps: &regex::Captures| {
        let callout_type = &caps[1];
        let title = caps.get(2).map_or("", |m| m.as_str());
        let content = &caps[3];

        let emoji = match callout_type {
            "message" | "info" => "💡",
            "warning" => "⚠️",
            "alert" | "error" => "🚨",
            _ => "📌",
        };

        format!(
            "<div class=\"callout callout-{}\">\
            <div class=\"callout-title\">{} {}</div>\
            <div class=\"callout-content\">{}</div>\
            </div>",
            callout_type, emoji, title, content
        )
    })
    .into_owned()
}

fn preprocess_bookmark_links(markdown: &str) -> String {
    let re = Regex::new(r"\[bookmark\]\((.*?)\)").unwrap();
    re.replace_all(markdown, |caps: &regex::Captures| {
        let url = &caps[1];
        format!(
            "<div class=\"link-card\" data-url=\"{}\" data-processed=\"false\"></div>",
            url
        )
    })
    .into_owned()
}

#[wasm_bindgen]
pub fn render_markdown(markdown: &str) -> String {
    let preprocessed = preprocess_bookmark_links(&preprocess_callout_syntax(markdown));

    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_SMART_PUNCTUATION);

    let parser = Parser::new_ext(&preprocessed, options);

    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    html_output
}
