---
slug: build-macos
title: Building Tonatiuh++ on macOS
authors: mblanco
tags: [macos, build, development]
---

![Tonatiuh++ running on macOS](/img/tonatiuhxx-apple-screenshot.png)

macOS provides a clean and robust environment for building **Tonatiuh++** thanks to its modern **Apple Clang** compiler, strong UNIX foundations, and excellent package management through **Homebrew**.  

This guide describes the complete process for building Tonatiuh++ from source on **macOS Ventura, Sonoma, and newer**, including installing the required development tools, building third-party dependencies using the scripts provided in the repository, configuring the project with CMake, and compiling the final application.

The workflow is **entirely command-line–based** and uses the system **Clang toolchain** provided by Xcode Command Line Tools. No IDE integration is required.

<!-- truncate -->

## Installing Homebrew

Homebrew is the standard package manager on macOS and will be used throughout this guide to install build tools and libraries.

If Homebrew is not already installed, open **Terminal** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation completes, update Homebrew:

```bash
brew update
```

Homebrew works transparently on both Apple Silicon and Intel Macs and will be used to install CMake, Python, Qt 6, and additional development libraries required by Tonatiuh++.

## Installing required Development Tools

Tonatiuh++ is built on macOS using the **Apple Clang** compiler and the system SDK provided by Xcode Command Line Tools.

Install the required compiler and developer tools by running:

```bash
xcode-select --install
```    

This installs:

- Apple Clang (C++20 capable)
- macOS SDK
- Build utilities (make, ld, etc.)

Verify the compiler:

```bash
clang++ --version
```

You should see Apple Clang 14 or newer. If the command is not found, ensure that Xcode Command Line Tools are installed and selected by running:

```bash
xcode-select -p
```

This command should print a path similar to:

```text
/Library/Developer/CommandLineTools
```
If no path is shown or an error is reported, reinstall the tools:

```bash
sudo xcode-select --reset
xcode-select --install
```

After installation completes, close the terminal, open a new one, and retry:

```bash
clang++ --version
```

## Installing core tools via Homebrew

Install the core tools required to build Tonatiuh++ using Homebrew:

```bash
brew install cmake git python
```

This installs:

- CMake – project configuration and build system
- Git – source control and dependency fetching
- Python 3 – required to run the dependency build scripts

Optional (recommended)

```bash
brew install ninja pkg-config
```

Ninja provides significantly faster builds than Make, but is not required. pkg-config helps some third-party libraries locate system dependencies.

### Verify core tools installation:

Confirm that the required tools are available:

```bash
cmake --version
git --version
python3 --version
```

Each command should print a version number. If any command is not found, ensure Homebrew is correctly installed and that `/opt/homebrew/bin` is present in your PATH.

## Installing Qt 6

Tonatiuh++ requires **Qt 6.x** for its graphical user interface.

Install Qt via Homebrew:

```bash
brew install qt@6
```

On macOS, Homebrew installs Qt into a standard prefix:

- **Apple Silicon:** /opt/homebrew/opt/qt@6
- **Intel Macs:** /usr/local/opt/qt@6

Qt provides CMake configuration files under:

```text
<qt-prefix>/lib/cmake/Qt6
```
which allows CMake to locate Qt automatically during configuration.

### Verify the Qt installation

You can verify that Qt 6 is installed by running:

```bash
qtpaths --qt-version
```
This should report a Qt 6.x version.

**Note**
Qt does not need to be added to your PATH. The Tonatiuh++ build system and dependency scripts will locate Qt automatically using CMake.

## Cloning the Tonatiuh++ repository

Choose a working directory and clone the repository together with its submodules:

```bash
git clone --recurse-submodules https://github.com/CST-Modelling-Tools/tonatiuhpp.git
cd tonatiuhpp
```
If you already cloned the repository without submodules, initialize them with:

```bash
git submodule update --init --recursive
```

## Building third-party dependencies

Tonatiuh++ relies on several third-party libraries, including **Coin3D**, **SoQt**, and **simage**, which are built locally using a Python script provided in the repository.

### Create and activate a Python virtual environment
On macOS, Homebrew-managed Python requires third-party packages to be installed inside a virtual environment.

From the root of the repository, create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Your shell prompt should now indicate that the environment is active.

### Install required Python packages

Install PyYAML, which is required by the dependency build script:

```bash
pip install --upgrade pip
pip install pyyaml
```

### Run the dependency build script

With the virtual environment active, run:

```bash
python scripts/build_deps.py
```

The script will:

- detect Qt, CMake, and system tools,
- download and build third-party libraries,
- install them under third_party/_install,
- generate CMake hint files for later configuration.

The initial run may take several minutes.

### Troubleshoot network / SSL issues (rare)

If you encounter SSL errors while downloading sources, ensure that your Python environment has up-to-date certificates:

```bash
pip install --upgrade certifi
```
Then rerun the build script.


## Configuring the build with CMake

After building the third-party dependencies, configure Tonatiuh++ using CMake.

From the root of the repository, run:

```bash
cmake -S source -B build -DCMAKE_BUILD_TYPE=Release
```

CMake will automatically locate all required dependencies using:

- the locally built third-party libraries under third_party/_install,
- the generated cmake/LocalDepsHints.cmake file,
- Qt 6 installed via Homebrew.

If configuration completes successfully, CMake will report that it has found:

- the Apple Clang compiler,
- Qt 6,
- Coin3D and SoQt.

## Building and installing Tonatiuh++

After configuring the project, build and install Tonatiuh++:

```bash
cmake --build build --parallel
cmake --install build
```

By default, Tonatiuh++ is installed into a user-local directory (for example ~/tonatiuhpp).

On macOS, the application bundle will be located at:

```text
<install-prefix>/bin/TonatiuhXX.app
```

## Running Tonatiuh++
You can launch the application either from Finder or from the terminal:

```bash
open ~/tonatiuhpp/bin/tonatiuhpp.app
```

## Troubleshooting

### Qt 6 not detected by CMake

If CMake reports that Qt 6 cannot be found, first verify that Qt is installed via Homebrew:

```bash
qtpaths --qt-version
```

This should report a Qt 6.x version.

If Qt is installed but CMake still fails to configure, ensure that the dependency build step completed successfully and that cmake/LocalDepsHints.cmake exists in the repository.

### build_deps.py fails to start

On macOS, Homebrew-managed Python requires running the dependency script inside a virtual environment.

Ensure that the virtual environment is activated:

```bash
source .venv/bin/activate
```

Then verify that PyYAML is installed:

```bash
python -c "import yaml; print(yaml.__version__)"
```

If needed, reinstall it:

```bash
pip install pyyaml
```

### Diagnose the environment

To check your system configuration and dependency discovery, you can run:

```bash
python scripts/build_deps.py --doctor
```
This diagnostic mode reports missing tools, misconfigured paths, and common macOS setup issues.

## Summary

In this guide, you built and installed **Tonatiuh++** from source on macOS. The process consisted of the following main steps:

1. Install Homebrew and the required developer tools.
2. Install core build tools (CMake, Git, Python) and Qt 6 using Homebrew.
3. Clone the Tonatiuh++ repository with its submodules.
4. Build the required third-party dependencies using `build_deps.py`.
5. Configure the project with CMake.
6. Build and install the application.
7. Launch the installed macOS application bundle.

macOS provides a clean and reliable build environment for Tonatiuh++ thanks to its modern Clang toolchain, robust UNIX foundations, and mature package ecosystem.