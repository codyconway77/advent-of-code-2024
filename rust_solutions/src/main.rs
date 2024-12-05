use std::env;
use std::fs;
use regex::Regex;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];
    let challenge = &args[2];

    let contents = read_file(file_path);
    let mut instructions: Vec<(i32, i32)> = vec![];
    match challenge.as_str() {
        "1" => instructions = parse_valid_instructions(&contents),
        "2" => instructions = parse_valid_instructions_with_conditionals(&contents),
        _ => panic!("pass 2nd CLI arg as either 1 or 2"),
    }
    let total_result = calculate_results(&instructions);

    println!("Final Result: {}", total_result);
}

fn read_file(file_path: &str) -> String {
    fs::read_to_string(file_path).expect("Should have been able to read the file")
}

fn parse_valid_instructions(corrupted_instructions: &str) -> Vec<(i32, i32)> {
    let valid_instructions_regex = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();
    valid_instructions_regex
        .captures_iter(corrupted_instructions)
        .filter_map(|caps| {
            let x = caps.get(1)?.as_str().parse::<i32>().ok();
            let y = caps.get(2)?.as_str().parse::<i32>().ok();
            match (x, y) {
                (Some(x), Some(y)) => Some((x, y)),
                _ => None,
            }
        })
        .collect()
}

fn parse_valid_instructions_with_conditionals(corrupted_instructions: &str) -> Vec<(i32, i32)> {
    let valid_instructions_regex = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\))").unwrap();
    let mut operations_enabled = true;
    valid_instructions_regex
        .captures_iter(corrupted_instructions)
        .filter_map(|caps| {
            if let Some(x_match) = caps.get(1) {
                if operations_enabled {
                    // This is a `mul(X,Y)` instruction
                    let x = x_match.as_str().parse::<i32>().ok();
                    let y = caps.get(2)?.as_str().parse::<i32>().ok();
                    return match (x, y) {
                        (Some(x), Some(y)) => Some((x, y)),
                        _ => None,
                    };
                }
            } else if let Some(do_match) = caps.get(3) {
                // This is a `do()` instruction
                operations_enabled = true;
            } else if let Some(dont_match) = caps.get(4) {
                // This is a `don't()` instruction
                operations_enabled = false;
            }
            None
        })
        .collect()
}

fn calculate_results(instructions: &[(i32, i32)]) -> i32 {
    instructions.iter().map(|(x, y)| x * y).sum()
}
