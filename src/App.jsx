import { useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Card from './components/ui/Card';

function App() {
  const [name, setName] = useState('');

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>LipaFlow</h1>
      <Card title="Component test">
        <Input
          label="Customer name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Wanjiku"
        />
        <Button onClick={() => alert(`Hello ${name}`)}>Say hello</Button>{' '}
        <Button variant="danger" onClick={() => setName('')}>Clear</Button>
      </Card>
    </div>
  );
}

export default App;