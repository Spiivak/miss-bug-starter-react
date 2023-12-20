const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, onEditBug }) {

    if (!bugs) return <div>Loading...</div>
    return (
        <ul className="bug-list">
            {bugs.map((bug) => (
                <li className="bug-preview clean-list flex column space-between" key={bug._id}>
                    <BugPreview bug={bug} />
                    <div>
                        <button onClick={() => onRemoveBug(bug._id)}>x</button>
                        <button onClick={() => onEditBug(bug)}>Edit</button>
                        <Link to={`/bug/${bug._id}`}>Details</Link>
                    </div>
                </li>
            ))
            }
        </ul >
    )
}
