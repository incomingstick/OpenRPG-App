{
    "targets": [
      {
        "include_dirs": [
          "../../include"
        ],
        'link_settings': {
          'libraries': ["-L <(module_root_dir)/../../build/lib/", "-l roll-parser"]
        },
        "target_name": "roll",
        "sources": [ 
          "roll/rollAddon.cpp",
          "roll/rollWrapper.cpp"
      ]
    }
  ]
}