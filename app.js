// const getEventActivity = 

(async () => {
    if (process.argv[2]) {
        try {
            const userId = process.argv[2];
            const eventsData = await fetch(`https://api.github.com/users/${userId}/events`);
            if (eventsData.status === 200) {
                let issuesCount = 0;
                const eventsDataJson = await eventsData.json();
                const repoFullName = eventsDataJson.find(event => event.type === 'CreateEvent').repo.name;

                const commitsNumber = eventsDataJson.find(event => event.type === 'PushEvent').payload.commits.length;

                eventsDataJson.forEach(event => {
                    if (event.type === 'IssuesEvent') {
                        issuesCount++;
                    }
                })

                console.log(`Pushed ${commitsNumber} ${commitsNumber === 1 ? 'commit' : 'commits'} to ${repoFullName}.`);
                console.log(`Opened ${issuesCount} ${issuesCount === 1 ? 'isuee' : 'issues'}.`)
            }
            else {
                console.log('Ann error occured with actual repositoty')
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }
})()