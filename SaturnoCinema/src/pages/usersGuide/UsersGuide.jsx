import UserItem from "../../components/userItem/userItem"
import './usersGuide.css'

const UsersGuide = ({users}) => {
    return (
        <div className="users-guide">
            <h1 className="users-title">USUARIOS</h1>
            <div className="users">
                {users.map((user) => (
                    <UserItem 
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default UsersGuide