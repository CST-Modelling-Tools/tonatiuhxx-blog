---
slug: build-windows
title: "Building Tonatiuh++ on Windows 11"
authors: mblanco
tags: [windows, build, development]
---

![Tonatiuh++ running on Windows 11](/img/tonatiuhxx-windows-screenshot.png)

Building Tonatiuh++ from source on Windows 11 requires installing a small set of development tools, building third-party dependencies using the provided automation scripts, compiling the application with CMake, and finally installing it so that all runtime dependencies are correctly resolved.

This guide describes a **command-line–only workflow**, without relying on Visual Studio Code or IDE integration. All steps are performed using the MSVC x64 toolchain.


<!-- truncate -->

# 1. Install Required Tools

## 1.1 Install Git
Download from: https://git-scm.com/download/win

Choose: **Git from the command line and also from 3rd-party software**

Verify installation:

```cmd
>git --version
git version 2.51.1.windows.1
```

## 1.2 Install Python 3
Download from: https://www.python.org/downloads/windows/

During installation:
- ✔ Check **Add Python to PATH**

Verify:

```cmd
>python --version
Python 3.13.3
```
Upgrade pip if needed:

```cmd
>python -m pip install --upgrade pip
```

If you see a warning about pip scripts not being on PATH, add the indicated directory to your PATH and restart the shell.

## 1.3 Install Visual Studio 2026 (or Build Tools)

Download from: https://visualstudio.microsoft.com/downloads/

Install: **Visual Studio 2026 Community**

Select:
- Desktop development with C++
- MSVC C++ x64/x86 build tools
- Windows 10/11 SDK
- (Optional) CMake tools

---

# 2. Install Qt 6

Download the Qt Online Installer from: https://www.qt.io/download-qt-installer

Select:
- Qt 6.x
- Component: **msvc2022_64**

Qt installs to:

```text
C:\Qt\6.x.x\msvc2022_64\
```

---

# 3. Open the Build Environment

Open: x64 Native Tools Command Prompt for VS 2026

```text
**********************************************************************
** Visual Studio 2026 Developer Command Prompt v18.1.0
** Copyright (c) 2025 Microsoft Corporation
**********************************************************************
[DEBUG:ext\vcvars.bat] Found potential v145 version file: 'Microsoft.VCToolsVersion.VC.14.50.18.0.txt'
[DEBUG:ext\vcvars.bat] Testing v145 version file: 'Microsoft.VCToolsVersion.VC.14.50.18.0.txt'
[vcvarsall.bat] Environment initialized for: 'x64'

C:\Program Files\Microsoft Visual Studio\18\Community>
```

Verify:

```cmd
>cl
Microsoft (R) C/C++ Optimizing Compiler Version 19.50.35720 for x64
Copyright (C) Microsoft Corporation.  All rights reserved.

usage: cl [ option... ] filename... [ /link linkoption... ]
```
---

# 4. Clone Tonatiuh++

Using the command "cd" (change directory) in the x64 Native Tools Command Prompt for VS 2026 shell, move to the directory where you want the GitHub repository of Tonatiuh++ to be clone, and clone the repository.

```cmd
>git clone https://github.com/CST-Modelling-Tools/tonatiuhpp.git
cd tonatiuhpp
```

---

# 5. Build Third-Party Dependencies

```cmd
python scripts/build_deps.py
```

If PyYAML is missing install it, and try again:

```cmd
python -m pip install --upgrade pip
pip install pyyaml
python scripts/build_deps.py
```

The script automatically:
- detects Qt, Boost, and Eigen
- builds Coin3D, simage, SoQt
- generates dependency hints for CMake

---

# 6. Configure Tonatiuh++

```cmd
cmake -B build -S source -DCMAKE_BUILD_TYPE=Release
```

No `CMAKE_PREFIX_PATH` is required.

---

# 7. Build Tonatiuh++

```cmd
cmake --build build --config Release
```

Executable:

```text
build\application\Release\tonatiuhpp.exe
```

---

# 8. Optional: Deploy Qt DLLs

```cmd
C:\Qt\6.x.x\msvc2022_64\bin\windeployqt.exe ^
build\application\Release\TonatiuhXX.exe
```

---

# Summary

1. Install Git, Python, MSVC, Qt  
2. Clone the repository  
3. Run `build_deps.py`  
4. Configure with CMake  
5. Build and run Tonatiuh++

Tonatiuh++ now builds cleanly on Windows 11 using modern MSVC and Qt.
