export function BugPreview({ bug }) {
    const labelsArray = Array.isArray(bug.labels) ? bug.labels : [];

    return (
        <article>
            <div className="labels flex">
                {labelsArray.map((label, index) => (
                    <div key={index} className={`label ${label}`}>
                        {label.split('-').map((part, partIndex) => (
                            <span key={partIndex}>{part}</span>
                        ))}
                    </div>
                ))}
            </div>
            <h4 className="bug-title">{bug.title}</h4>
            <p className="bug-severity">Severity: <span>{bug.severity}</span></p>
            <p className="bug-desc">{bug.desc}</p>
        </article>
    );
}
