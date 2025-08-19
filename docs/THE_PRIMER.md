### Part 2: Rebase vs. Merge - *Rewriting History vs. Documenting It*

Once you've finished exploring your line of play on a feature branch, you need to integrate it back into the `main` branch. Git gives us two primary ways to do this: `git merge` and `git rebase`. The choice between them is a strategic one, much like choosing between documenting a game's history as it happened versus recounting a cleaner, more idealized version of it.

-   **`git merge` (Documenting History):** Merging creates a new "merge commit" in your `main` branch. This commit has two parents: the tip of `main` and the tip of your feature branch. It weaves the two histories together, preserving a precise, chronological record of exactly what happened and when. The project history becomes a complex but truthful tapestry of all the parallel work. It's like a detailed, turn-by-turn game log, warts and all.

-   **`git rebase` (Rewriting History):** Rebasing takes a different approach. Instead of creating a merge commit, it temporarily rewinds the commits you made on your feature branch. Then, it fast-forwards the `main` branch to the latest version. Finally, it replays your feature branch commits, one by one, *on top* of the updated `main` branch. It's as if you did all your work *after* everyone else's work was already finished. This results in a perfectly linear, clean, and easy-to-read history. It's like telling the story of the game by focusing only on the key, game-winning plays, presenting a much simpler narrative.

For PodTracker, we prefer the **rebase workflow**. A clean, linear history is easier to read, understand, and debug. It makes tracking down when a bug was introduced much simpler. While the merge strategy has its place, the clarity of a rebased history is invaluable for long-term project maintainability.

### Part 3: The `git-push.sh` Helper Script - *The Automated Guide*

Rebasing can be a bit tricky, especially for newcomers. It involves several steps: fetching the latest changes from the remote repository, checking out your feature branch, rebasing it onto the `main` branch, and then pushing it to the remote. To make this process safe, consistent, and easy, we've created a helper script: `git-push.sh`.

This script is our automated guide. It performs all the necessary steps in the correct order, ensuring that your local branch is properly synchronized with the `main` branch before you push your changes. It also includes safeguards to prevent you from accidentally pushing directly to the `main` branch.

To use it, simply run the script from the root of the project when you are ready to push your changes:

```bash
./scripts/git-push.sh
```

The script will handle the fetch, rebase, and push operations for you, ensuring your new line of play is perfectly integrated with the main timeline before you share it with others.

### Part 4: The Pull Request Process - *Proposing a Rule Change*

Pushing your branch to the remote repository doesn't automatically merge it into `main`. Instead, it makes your work available for others to see. The final step is to propose that your changes be officially adopted into the main codebase. This is done through a **Pull Request (PR)**.

A Pull Request is a formal proposal to change the rules of the game. It's a request to the project maintainers to "pull" your branch into the `main` branch. It serves several critical functions:

1.  **Code Review:** It provides a forum for other developers to review your code. They can read through your changes, ask questions, suggest improvements, and catch potential bugs before they are merged. This collaborative process is one of the most effective ways to improve code quality.
2.  **Discussion:** It documents the history and reasoning behind a change. The PR description and comments provide context for why a feature was built a certain way.
3.  **Automated Checks:** Most Git platforms (like GitHub) can be configured to run automated checks on a PR. For example, it can run our entire test suite to ensure your changes haven't broken anything.

Once a Pull Request is approved and all checks have passed, the feature branch is merged into `main` by a project maintainer. Your new line of play has been successfully integrated, and the main road of the project has been extended.

---

## Chapter 7: Interacting with the Running Application - *Managing the Board State*

Your deck is built, your strategy is sound, and you've cast your `Genesis Wave` to put your entire application stack onto the battlefield. Now what? A good player must constantly survey the board, understand the state of the game, and know how to respond to changes.

This final chapter covers the basic Docker commands you'll need to interact with your running PodTracker application—to check its status, read its logs, and shut it down gracefully when you're finished.

### Part 1: Checking Container Status (`docker ps`) - *Surveying the Battlefield*

The first thing you need to know is what's actually on the battlefield. Which of your services are running? Are they healthy? What ports are they using?

The `docker ps` command (short for "processes") is your way of surveying the board. It lists all of the containers that are currently running.

```bash
# To see all running containers
docker ps
```

The output will give you a table of essential information for each container:
-   `CONTAINER ID`: A unique identifier for the container.
-   `IMAGE`: The Docker image the container is based on (e.g., `postgres:15-alpine`).
-   `COMMAND`: The command being run inside the container.
-   `CREATED`: How long ago the container was created.
-   `STATUS`: The current state of the container (e.g., `Up 2 hours`, `Restarting`).
-   `PORTS`: The port mappings between your host machine and the container.
-   `NAMES`: The friendly, human-readable name of the container (e.g., `podtracker-backend`).

This command is your go-to for a quick, high-level overview of your application's state.

### Part 2: Viewing Service Logs (`docker compose logs`) - *Reading the Stack*

Sometimes, surveying the board isn't enough. You need to know what happened, and in what order. You need to read the stack. In Magic, the stack is the zone where spells and abilities wait to resolve. Understanding it is key to navigating complex turns.

In Docker, the equivalent of reading the stack is viewing the **logs**. Every service in your application (`backend`, `frontend`, `db`) is constantly emitting output: status messages, error reports, and console logs from your code. The `docker compose logs` command lets you view this output in real-time.

```bash
# View the logs for all services
docker compose logs

# View the logs for a specific service (e.g., the backend)
docker compose logs backend

# Follow the logs in real-time (like watching the stack resolve)
docker compose logs -f backend
```

-   `docker compose logs backend`: Shows you all the past output from the `backend` service.
-   The `-f` or `--follow` flag is incredibly useful. It tails the log output, showing you new messages as they happen. This is essential for debugging. When you make a request to your API, you can watch the log in real-time to see exactly how it processes the request.

Reading the logs is the most fundamental debugging technique in a containerized environment. It's how you find out what your application is thinking.

### Part 3: Stopping the Application (`docker compose down`) - *Conceding the Game*

When the game is over, or you're ready to take a break, it's time to pack up your cards. You don't just walk away from the table; you concede the game gracefully, stopping all the running processes and cleaning up the board.

The `docker compose down` command is how you concede the game. It stops and removes all the containers, networks, and volumes that were created by `docker compose up`.

```bash
# Stop and remove all application containers and networks
docker compose down
```

This command is the clean and proper way to shut down your entire application stack. It ensures that no orphaned containers are left running in the background, consuming system resources.

With these commands, you now have the essential skills to manage your application's board state: you can survey the battlefield, read the stack, and concede the game. You are now a fully equipped PodTracker developer, ready to build, test, and manage a world-class PWA.

Happy coding!