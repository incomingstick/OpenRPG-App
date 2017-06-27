set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

set(UTIL_SOURCE
        ${CMAKE_SOURCE_DIR}/src/utils.cpp
)

add_library(utils SHARED ${UTIL_SOURCE})

install(TARGETS utils
           ARCHIVE DESTINATION lib
           LIBRARY DESTINATION lib
           RUNTIME DESTINATION bin)

# if the utils library needs a higher standard than C++11 please update here
set_property(TARGET utils PROPERTY CXX_STANDARD 11)
set_property(TARGET utils PROPERTY CXX_STANDARD_REQUIRED ON)

# build openrpg here
set(ORPG_SOURCES 
    ${CMAKE_SOURCE_DIR}/src/openrpg.cpp
)

add_executable(openrpg-tui ${ORPG_SOURCES})
target_link_libraries(openrpg-tui utils names roll-parser)

# if the openrpg executable needs a higher standard than C++11 please update here
set_property(TARGET openrpg-tui PROPERTY CXX_STANDARD 11)
set_property(TARGET openrpg-tui PROPERTY CXX_STANDARD_REQUIRED ON)

install(TARGETS openrpg-tui DESTINATION bin)

# module directories
add_subdirectory("names")
add_subdirectory("roll")
add_subdirectory("character")
