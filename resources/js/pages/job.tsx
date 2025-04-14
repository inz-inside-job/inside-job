export default function JobPage({ job }: { job: App.Data.Jobs.JobData }) {
    return (
        <>
            <h1>{job.title}</h1>
        </>
    );
}
