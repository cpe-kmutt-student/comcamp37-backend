export default { 
    extends: ["@commitlint/config-conventional"],
    rules: {
    "scope-enum": [
      2,
      "always",
      [
        "setup",
        "config",
        "deps",
        "feature",
        "bug",
        "docs",
        "style",
        "refactor",
        "test",
        "build",
        "ci",
        "release",
        "other",
      ],
    ],
  },
};
