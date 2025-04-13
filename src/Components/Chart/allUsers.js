import Image from "next/image";

export default function AllUsers({ users }) {
  return (
    <div className="user-container">
      <p className="text">
        <b>All Users</b>
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "600",
          marginTop: "1rem",
          padding: "0 1rem",
        }}
      >
        <p style={{ width: "50%", textAlign: "left" }}>Name</p>
        <p style={{ width: "50%", textAlign: "right" }}>
          Active Login Sessions
        </p>
      </div>
      {users.map((d) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0.5rem",
            borderBottom: "1px solid rgba(75, 192, 192, 0.1)",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          key={d.id}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Image src={d.image} height="40" width="40" alt="profile-img" />
            <p style={{ marginLeft: "1rem" }}>{d.name}</p>
          </div>
          <p
            style={{
              width: "50%",
              textAlign: "right",
              paddingRight: "4rem",
            }}
          >
            {d.activeLoginTimes}
          </p>
        </div>
      ))}
    </div>
  );
}
