import { Stack, Button } from '@mui/material';
import { MdGroupAdd } from "react-icons/md";
import { FaPeopleGroup, FaHeartCirclePlus } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <h1 className="home-title">Welcome to UCLA's premier study group app!</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} className="box-style">
          <MdGroupAdd size={250} style={{ color: '#4287f5' }} />
          <h1 className="home-subtitle">Create Study Groups</h1>
          <p>Take charge and create study groups that fellow study buddies can join. Groups can be customized to your liking!</p>
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} className="box-style">
          <FaPeopleGroup size={250} style={{ color: '#4287f5' }} />
          <h1 className="home-subtitle">Join Study Groups</h1>
          <p>Enhance your studying by joining study groups with buddies that are taking the same classes as you!</p>
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} className="box-style">
          <FaHeartCirclePlus size={250} style={{ color: '#4287f5' }} />
          <h1 className="home-subtitle">Connect with Peers</h1>
          <p>Make some new study buddies by connecting with UCLA students in the same or different classes!</p>
        </Stack>
      </div>
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Button variant="contained" color="primary" size="large">
          Login
        </Button>
      </div>
    </>
  );
}
