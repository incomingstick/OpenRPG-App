{
  "targets": [
    {
      "include_dirs": [
        "../OpenRPG/include"
      ],
      'link_settings': {
        'libraries': ["-L <(module_root_dir)/../OpenRPG/build/lib/", "-l roll-parser"]
      },
      "target_name": "roll",
      "sources": [ 
        "roll/rollAddon.cpp",
        "roll/rollWrapper.cpp"
      ]
    }
  ]
}