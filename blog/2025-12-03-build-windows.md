---
slug: build-windows
title: "Building Tonatiuh++ on Windows 11"
authors: mblanco
tags: [windows, build, development]
---

![Tonatiuh++ running on Windows 11](/img/tonatiuhxx-windows-screenshot.png)

Building Tonatiuh++ from source on Windows 11 requires installing several development tools, configuring Qt, building third-party dependencies, and finally compiling the application using CMake. This guide provides a complete, step-by-step workflow based on the Qt Online Installer, Visual Studio Build Tools, and the official Tonatiuh++ build scripts.

<!-- truncate -->

# 1. Install Required Tools

## 1.1 Install Git
Download: https://git-scm.com/download/win  
Choose: “Git from the command line and also from 3rd-party software”.

## 1.2 Install Python 3
Download: https://www.python.org/downloads/windows/  
During installation:
- Check “Add Python to PATH”.

Verify installation:
    python --version

## 1.3 Install Visual Studio Build Tools (MSVC)
Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/  
Select workload:
- Desktop development with C++
- Windows 10/11 SDK
- (Optional) C++ CMake Tools for Windows

# 2. Install Qt 6 Using the Qt Online Installer

Download installer:  
https://www.qt.io/download-qt-installer

Choose:
- Qt 6.x (preferably latest LTS)
- Component: msvc2022_64

Qt will be installed in:
    C:\Qt\6.x.x\msvc2022_64\

You will need this path later.

# 3. Clone the Tonatiuh++ Repository

In a PowerShell or Git Bash terminal:
    git clone https://github.com/CST-Modelling-Tools/TonatiuhXX.git
    cd TonatiuhXX

# 4. Build Third-Party Dependencies

Tonatiuh++ uses Coin3D, SoQt, simage, and other libraries.  
These are built automatically with:
    python build_deps.py

This may take several minutes.

# 5. Configure the Tonatiuh++ Build (CMake)

Run CMake configuration step:
    cmake -B build -S source ^
      -DCMAKE_BUILD_TYPE=Release ^
      -DCMAKE_PREFIX_PATH="C:/Qt/6.x.x/msvc2022_64"

Replace the Qt path with your actual installation directory.

CMake will generate Visual Studio project files.

# 6. Build Tonatiuh++

    cmake --build build --config Release

The resulting executable will be in:
    build\application\Release\TonatiuhXX.exe

# 7. Optional: Open the Project in an IDE

Open in Visual Studio:
    cmake --open build

Open folder in VS Code and install recommended extensions:
- CMake Tools
- C/C++

# 8. Troubleshooting

## Qt not found
Ensure correct prefix path:
    -DCMAKE_PREFIX_PATH="C:/Qt/6.x.x/msvc2022_64"

## MSVC not detected
Use “Developer PowerShell for VS 2022”.

## build_deps.py errors
Make sure Python is 3.8+ and run:
    python -m pip install requests

## Missing DLLs when running Tonatiuh++
Run `windeployqt`:
    "C:\Qt\6.x.x\msvc2022_64\bin\windeployqt.exe" build\application\Release\TonatiuhXX.exe

# Summary

To build Tonatiuh++ on Windows 11:

1. Install Git, Python, MSVC Build Tools, and Qt.
2. Clone the repository.
3. Build third-party dependencies using build_deps.py.
4. Configure and compile using CMake.

You now have a fully working Windows build of Tonatiuh++ ready for use and development.
---
