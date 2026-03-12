<script>
const API_URL = "https://pascal-checker-api--hamadafor.replit.app/check-task";

async function checkTask(taskId, textareaId, resultId) {
    const code = document.getElementById(textareaId).value.trim();
    const result = document.getElementById(resultId);

    if (!code) {
        result.textContent = "Please paste your code first.";
        result.style.color = "red";
        return;
    }

    result.textContent = "Checking...";
    result.style.color = "inherit";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskId: taskId,
                code: code
            })
        });

        const data = await response.json();

        if (!data.ok) {
            result.textContent = data.error || "Server error";
            result.style.color = "red";
            return;
        }

        if (data.correct) {
            result.textContent = "✅ Correct";
            result.style.color = "limegreen";
        } else {
            result.textContent =
                "❌ Wrong\n\nExpected:\n" +
                (data.expected || "") +
                "\n\nYour output:\n" +
                (data.output || "");
            result.style.color = "red";
        }
    } catch (err) {
        result.textContent = "Connection failed.";
        result.style.color = "red";
        console.error(err);
    }
}
</script>
