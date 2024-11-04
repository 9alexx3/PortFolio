// Obtener referencias a los elementos del DOM
const input = document.getElementById("input-powershell");
const output = document.getElementById("output");

// Manejar el evento "Enter" para ejecutar comandos
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = input.value.trim();
        if (command) {
            input.value = "";
            addCommandToOutput(command);
        }
    }
});

// Añadir el comando y su salida a la consola
function addCommandToOutput(command) {
    const commandContainer = createCommandContainer(command);
    const outputSpan = document.createElement("p");
    outputSpan.classList.add("prompt");
    commandContainer.appendChild(outputSpan);

    executeCommand(command, outputSpan);  // Ejecutar el comando
    output.appendChild(commandContainer);

    scrollToBottom();
    input.focus();
}

// Crear el contenedor del comando
function createCommandContainer(command) {
    const commandContainer = document.createElement("div");
    commandContainer.classList.add("command-container");

    const promptSpan = createElement("span", "prompt", "PS C:\\Users\\acastell>");
    const commandSpan = createElement("span", "command", command);

    commandContainer.append(promptSpan, commandSpan);
    return commandContainer;
}

// Crear un elemento con clase y contenido opcional
function createElement(tag, className, textContent = "") {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}

// Mapeo de comandos a funciones
const commands = {
    dir: getDirectoryListing,
    ls: getDirectoryListing,
    "get-content": getFileContent,
    type: getFileContent,
    more: getFileContent,
    echo: printMessage,
    "write-output": printMessage,
    help: getHelp,
    "?": getHelp,
    clear: clearConsole,
    cls: clearConsole,
    "clear-host": clearConsole,
    whoami: showUser,
    eval: evalCommand,
    ipconfig: getIpConfig,
    "get-netipaddress": getIpConfig,
    exit: exitConsole,
    unknown: getUnknownMessage,
};

// Ejecutar el comando
function executeCommand(command, outputSpan) {
    const cmdlets = command.split(' ');
    const cmdlet = cmdlets[0].toLowerCase();

    // Verificar si el comando existe en el objeto
    const execute = commands[cmdlet];
    if (execute) {
        outputSpan.textContent = execute(cmdlets.slice(1).join(" "));
    } else {
        outputSpan.textContent = getCommandNotFoundMessage(cmdlet, command);
        outputSpan.style.color = "red";
    }

    outputSpan.style.whiteSpace = "pre-wrap";
}

// Funciones específicas para cada comando

function getDirectoryListing() {
    return (
        "\n\t\tDirectory: C:\\Users\\AlejandroC\n\n" +
        "Mode\t\t\tLastWriteTime\t\tLength\t\tName\n" +
        "-----\t\t\t-------------\t\t------\t\t------\n" +
        "d-----\t\t20/09/2024\t22:09\t\t\t\t\t.cache\n" +
        "d-r---\t\t29/03/2024\t10:30\t\t\t\t\tDesktop\n" +
        "d-----\t\t03/05/2024\t18:29\t\t\t\t\t.ssh\n" +
        "-a----\t\t17/01/2022\t18:03\t\t1097\t\tWazuhAgent.msi\n" +
        "-a----\t\t29/04/2022\t18:03\t\t  101  \t\tWazuh-log.txt\n\n"
      );
      
}

function getFileContent(fileName) {
    const fileSystem = {
        "wazuh-log.txt": "I'M WATCHING YOU!! (≖ ‿ ≖ )",
        "wazuhagent.msi": "This is a binary file. Cannot be readable."
    };
    return fileSystem[fileName] || `The file "${fileName}" does not exist or cannot be read.`;
}

function printMessage(args) {
    return args;  // Retorna los argumentos como el mensaje que se quiere imprimir
}

function getHelp(command) {
    const helpMessages = {
        dir: "Command: dir // ls\n\nIt lists files and directories...",
        ipconfig: "Command: ipconfig // get-netipaddress\n\nShows network configuration...",
        "get-content": "Command: get-content // type // more\n\nReads and displays text files...",
        echo: "Command: echo // write-output\n\nPrints custom messages...",
        clear: "Command: clear // cls\n\nClears the console screen...",
        whoami: "Command: whoami\n\nShows the current user...",
        eval: "Command: eval\n\nExecutes JavaScript code...",
        exit: "Command: exit\n\nCloses the terminal...",
        unknown: "Command: unknown\n\nUnknown special command...",
        default: "\nCommands summary:\n\ndir: Show files on the actual path.\nwrite-output / echo: Print messages to the console.\nclear-host / cls / clear: Clear the console screen.\nwhoami: Displays the current machine name and user.\neval: Executes JavaScript instructions.\nexit: Closes the PowerShell window.\nipconfig / get-netipaddress: Show network configuration.\nunknown: ???? ???? ???? ??? ??\n\n",
    };
    return helpMessages[command?.toLowerCase()] || helpMessages.default;
}

function evalCommand(code) {
    try {
        return eval(code);
    } catch (e) {
        return `Error: ${e.message}`;
    }
}

function getIpConfig() {
    return `
            IPAddress         : fe80::4300:6109:23bc:d611%10
            InterfaceIndex    : 10
            InterfaceAlias    : Ethernet
            AddressFamily     : IPv6
            Type              : Unicast
            PrefixLength      : 64
            PrefixOrigin      : WellKnown
            SuffixOrigin      : Link
            AddressState      : Preferred
            ValidLifetime     :
            PreferredLifetime :
            SkipAsSource      : False
            PolicyStore       : ActiveStore

            IPAddress         : 2a0c:5a84:d102:e800::1
            InterfaceIndex    : 10
            InterfaceAlias    : Ethernet
            AddressFamily     : IPv6
            Type              : Unicast
            PrefixLength      : 128
            PrefixOrigin      : Dhcp
            SuffixOrigin      : Dhcp
            AddressState      : Preferred
            ValidLifetime     :
            PreferredLifetime :
            SkipAsSource      : False
            PolicyStore       : ActiveStore

            IPAddress         : ::1
            InterfaceIndex    : 1
            InterfaceAlias    : Loopback Pseudo-Interface 1
            AddressFamily     : IPv6
            Type              : Unicast
            PrefixLength      : 128
            PrefixOrigin      : WellKnown
            SuffixOrigin      : WellKnown
            AddressState      : Preferred
            ValidLifetime     :
            PreferredLifetime :
            SkipAsSource      : False
            PolicyStore       : ActiveStore

            IPAddress         : 192.168.1.114
            InterfaceIndex    : 10
            InterfaceAlias    : Ethernet
            AddressFamily     : IPv4
            Type              : Unicast
            PrefixLength      : 24
            PrefixOrigin      : Dhcp
            SuffixOrigin      : Dhcp
            AddressState      : Preferred
            ValidLifetime     : 22:44:41
            PreferredLifetime : 22:44:41
            SkipAsSource      : False
            PolicyStore       : ActiveStore

            IPAddress         : 127.0.0.1
            InterfaceIndex    : 1
            InterfaceAlias    : Loopback Pseudo-Interface 1
            AddressFamily     : IPv4
            Type              : Unicast
            PrefixLength      : 8
            PrefixOrigin      : WellKnown
            SuffixOrigin      : WellKnown
            AddressState      : Preferred
            ValidLifetime     :
            PreferredLifetime :
            SkipAsSource      : False
            PolicyStore       : ActiveStore
    `;
}

function getUnknownMessage() {
    return `01001011 01101111 01101110 01100001 01101101 01101001 00100000 01000011 01101111 01100100 01100101 00100001
⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ `;
}

function getCommandNotFoundMessage(cmdlet, command) {
    return `\n${cmdlet} : The term '${cmdlet}' is not recognized as a cmdlet or function.
At line:1 char:1
+ ${command}
   ${'~'.repeat(cmdlet.length)}\n+ CategoryInfo: ObjectNotFound\n\n`;
}

function showUser() {
    return "acastell\\AlejandroC";
}

function clearConsole() {
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}

function exitConsole() {
    document.getElementById('powershell').style.visibility = "hidden";
}

function scrollToBottom() {
    const last = document.getElementById('prompt-container');
    last.scrollIntoView({ behavior: "smooth", block: "end" });
}
