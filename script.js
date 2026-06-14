<script>
const COMPILER_API = "https://yarn-hypothetical-anatomy-collaboration.trycloudflare.com/api/run";

async function checkTask(taskId, textareaId, resultId) {
    const code = document.getElementById(textareaId).value.trim();
    const result = document.getElementById(resultId);

    if (!code) {
        result.textContent = "Please paste your code first.";
        result.style.color = "red";
        return;
    }

    result.textContent = "Compiling...";
    result.style.color = "inherit";

    try {
        const response = await fetch(COMPILER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code
            })
        });

        const data = await response.json();

        result.textContent = data.output || "No output returned.";
        result.style.color = "limegreen";

    } catch (err) {
        result.textContent = "Connection failed.";
        result.style.color = "red";
        console.error(err);
    }
}
</script>
