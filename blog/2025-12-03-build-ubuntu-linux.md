---
slug: build-linux
title: 'Building Tonatiuh++ on Ubuntu Linux'
authors: mblanco
tags: [linux, ubuntu, build, development]
---

![Tonatiuh++ running on Ubuntu Linux](/img/tonatiuhXX-ubuntu-linux-screenshot.png)

Ubuntu Linux provides an excellent environment for building Tonatiuh++ from source thanks to powerful package management tools, modern C++ compilers, and first-class CMake support. This guide explains how to install all necessary dependencies, compile third-party libraries, and build the full Tonatiuh++ application on Ubuntu 22.04 or later.

<!-- truncate -->

## Install Required Tools

### Python, Git, CMake, GCCC

Begin by installing essential development utilities:

```bash
sudo apt update
sudo apt install -y build-essential cmake git python3 python3-pip
```

This installs:

- Python (required for build_deps.py)
- Git
- Make tools
- CMake
- GCC/G++

#### Verify core tools installation 

```bash
python3 --version
git --version
g++ --version
```

Typically, these commands should report recent versions (`Python >= 3.12.2`, `git >= 2.43.0`, `cnake >= 3.30.2`, and `g++ >= 13.3.0`).

CMake and build_deps.py require python3 to be discoverable on the system path. If configuration fails due to Python detection, verify that python3 resolves correctly and points to a valid installation.

### Qt 6

Ubuntu’s repositories include Qt 6, which works well for Tonatiuh++.

Install the Qt development packages:

```bash
sudo apt install -y \
  qt6-base-dev qt6-base-dev-tools \
  qt6-tools-dev qt6-tools-dev-tools \
  qt6-wayland qt6-svg-dev qt6-5compat-dev
```

This installs:

- Qt 6 libraries
- Qt tools and utilities
- CMake integration files
- Platform plugins and SVG support required at runtime

#### Verify installation

Ensure Qt6 CMake files are avalable:

```bash
ls /usr/lib/x86_64-linux-gnu/cmake/Qt6/
```
If the directory exists, Qt 6 is correctly installed and ready to be detected by CMake. If missing, reinstall Qt packages.

### Eigen

Tonatiuh++ relies on Eigen as a header-only linear algebra library. On Ubuntu, Eigen is installed system-wide and discovered automatically during configuration.

Install Eigen using:

```bash
sudo apt update
sudo apt install -y libeigen3-dev
```
#### Verify installation
Check that the Eigen headers are present:

```bash
ls /usr/include/eigen3/Eigen/Core
```
### Boost
Tonatiuh++ uses Boost for several core utilities. On Ubuntu, Boost is provided as a system package and must be installed before configuring the project with CMake.

Install Boost using:

```bash
sudo apt install -y libboost-all-dev
```

#### Verify installation

Confirm that Boost headers are available:

```bash
ls /usr/include/boost/version.hpp
```

### Install additional X11 and OpenGL dependencies

Tonatiuh++ relies on Coin3D, SoQt, and OpenGL, which require several X11 and GL development headers on Linux.

Install the required system packages:

```bash
sudo apt install -y \
  libx11-dev libxt-dev libxext-dev libxmu-dev libxi-dev \
  libgl1-mesa-dev libglu1-mesa-dev freeglut3-dev

```

Installing these packages upfront avoids common build and link errors when compiling third-party dependencies.

## Clone the Tonatiuh++ Repository

Choose a working folder and clone the source:

```bash
git clone https://github.com/CST-Modelling-Tools/tonatiuhpp.git
cd tonatiuhpp
```
Project structure includes:

- `source/` – main code
- `build_deps.py` – dependency builder
- `CMakeLists.txt` – build configuration

## Build third-party dependencies

Tonatiuh++ uses Coin3D, SoQt, simage, and other libraries, which are built automatically using the provided script.

Run:

```bash
python3 build_deps.py
```

This step:

- downloads required third-party sources,
- configures builds
- configures and builds each dependency,
- installs them under `third_party/_install,`

The process may take several minutes depending on your system.

## Configure the Tonatiuh++ Build with CMake

Create a build directory and run CMake:

```bash
cmake -B build -S source -DCMAKE_BUILD_TYPE=Release
```

CMake will:

- detect GCC
- detect Qt6 from system packages
- detect dependencies built in deps/install/

If configuration finishes successfully, you will see:

- “Configuring done”
- “Generating done”

## Build the Application

Compile the project:

```bash
cmake --build build --config Release --parallel
```

The final binary will be located at:

```text
build/application/tonatiuhpp
```

Make it executable (if needed):

```bash
chmod +x build/application/TonatiuhXX
```

## Install Tonatiuh++

After the build completes successfully, install Tonatiuh++ to the system using CMake:

```bash
cmake --install build
```

By default, Tonatiuh++ is installed into a user-local directory, for example `~/tonatiuhpp`.

This does not require administrator privileges and avoids modifying system directories.

If you want to install to a different location, you may specify it explicitly:

```bash
cmake --install build --prefix /path/to/install
```

## Running Tonatiuh++ on Ubuntu

If installed using the default prefix, launch Tonatiuh++ with:

```bash
~/tonatiuhpp/bin/Tonatiuhpp
```

Alternatively, you can still run the application directly from the build tree:

```bash
./build/application/tonatiuhpp
```

If the main window opens correctly and the 3D view renders as expected, the installation is complete.

### Optional: Install OpenGL for Better Rendering

Most Ubuntu systems already include Mesa drivers, but if not, install OpenGL utilities for diagnostics::

```bash
sudo apt install -y mesa-utils
```

#### Verify installation

Test OpenGL:

```bash
glxinfo | grep "OpenGL version"
```

## Summary

To build Tonatiuh++ on Ubuntu Linux:

1. Install build tools, Qt6, X11/OpenGL dependencies.
2. Clone the repository.
3. Build third-party libraries with build_deps.py.
4. Configure with CMake.
5. Compile the application.

Ubuntu offers one of the smoothest build environments for Tonatiuh++, and once configured, rebuilding is fast and reliable.