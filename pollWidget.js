const PollWidget = (() => {
    const polls = {}; // Centralized state to manage multiple polls

    // Helper to get a unique page ID
    // By getting the pathname from the URL to make unique ID to avoid duplication 
    function getPageId() {
        return window.location.pathname.replace(/[^\w]/g, "_"); // Sanitize URL
    }

    // Helper to get poll results scoped by page
    function getResults(pollId) {
        const pageId = getPageId();
        return JSON.parse(localStorage.getItem(`poll_results_${pageId}_${pollId}`)) || [];
    }

    // Helper to save poll results scoped by page
    function saveResults(pollId, results) {
        const pageId = getPageId();
        localStorage.setItem(`poll_results_${pageId}_${pollId}`, JSON.stringify(results)); // we save the result to localStorage
    }

    // Helper to reset poll results scoped by page
    function resetResults(pollId) {
        const pageId = getPageId();
        localStorage.removeItem(`poll_results_${pageId}_${pollId}`); 
        render(pollId);
    }

    // Handle vote
    function handleVote(event) {
        const button = event.target.closest(".poll-option");
        if (!button) return;

        const pollId = button.closest(".poll-widget").dataset.pollId;
        const index = parseInt(button.dataset.index, 10);

        const results = getResults(pollId);
        results[index] = (results[index] || 0) + 1;
        saveResults(pollId, results);

        render(pollId);
    }
    

    // Render poll
    function render(pollId) {
        const poll = polls[pollId];
        const container = poll.container;
        const { question, options } = poll;

        const results = getResults(pollId);
        const totalVotes = results.reduce((sum, votes) => sum + votes, 0);

        container.innerHTML = `
            <div class="poll-question">${question}</div>
            <ul class="poll-options">
                ${options.map((option, index) => `
                    <li>
                        <button class="poll-option" data-index="${index}">${option}</button>
                        <div class="poll-result">
                            <div class="poll-bar" style="width: ${totalVotes > 0 ? (results[index] / totalVotes) * 100 : 0}%"></div>
                            <span>${results[index] || 0} votes</span>
                        </div>
                    </li>
                `).join("")}
            </ul>
            <button class="poll-reset">Reset Votes</button>
        `;

         // Attach click event listeners for poll options
        container.querySelectorAll(".poll-option").forEach(button =>
            button.addEventListener("click", handleVote)
        );
        // Attach event listeners
        container.querySelector(".poll-reset").addEventListener("click", () => resetResults(pollId));
    }

    // Initialize poll
    function init(container, pollId, question, options) {
        if (polls[pollId]) return; // Avoid duplicate polls
        if (!container) throw new Error("Container not found.");

        polls[pollId] = { container, question, options };
        container.dataset.pollId = pollId;
        container.classList.add("poll-widget");

        render(pollId);
    }

    // Return public API
    return {
        init,
    };
})();
