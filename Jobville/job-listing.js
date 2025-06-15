document.addEventListener("DOMContentLoaded", function () {
    const jobContainer = document.getElementById("job-container");
    const searchInput = document.getElementById("searchInput");

    if (!jobContainer || !searchInput || typeof jobPosts === "undefined") {
        console.error("Missing elements or jobPosts not loaded.");
        return;
    }

    function renderJobs(jobs) {
        jobContainer.innerHTML = "";

        if (jobs.length === 0) {
            jobContainer.innerHTML = "<p>No job matches found.</p>";
            return;
        }

        jobs.forEach(job => {
            const jobDiv = document.createElement("div");
            jobDiv.classList.add("job-listing");

            const url = `job-detail.html?title=${encodeURIComponent(job.title)}&jobLocation=${encodeURIComponent(job.jobLocation)}&company=${encodeURIComponent(job.company)}&experience=${encodeURIComponent(job.experience)}&closingDate=${encodeURIComponent(job.closingDate)}`;

            jobDiv.innerHTML = `
                <h2 onclick="window.location.href='${url}'">${job.title}</h2>
                <p><strong>Location:</strong> ${job.jobLocation}</p>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Closing Date:</strong> ${job.closingDate}</p>
            `;

            jobContainer.appendChild(jobDiv);
        });
    }

    function filterJobs(query) {
        const filtered = jobPosts.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.jobLocation.toLowerCase().includes(query) ||
            (job.experience && job.experience.toLowerCase().includes(query)) ||
            (job.description && job.description.toLowerCase().includes(query))
        );
        renderJobs(filtered);
    }

    // Search input event
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        filterJobs(query);
    });

    // Initial render
    renderJobs(jobPosts);
});
