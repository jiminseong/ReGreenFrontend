module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^\[(?<ticket>[A-Z]+-\d+)\]\s(?<type>feat|fix|chore|docs|style|refactor|test|perf|rename|remove)(?:\((?<scope>[a-z]+)\))?:\s(?<subject>.+)$/,
      headerCorrespondence: ["ticket", "type", "scope", "subject"],
    },
  },
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "docs", "style", "refactor", "test", "perf", "rename", "remove"],
    ],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "scope-enum": [2, "always", ["ui", "api", "auth", "infra"]],
    "scope-empty": [1, "always"],
  },
};
