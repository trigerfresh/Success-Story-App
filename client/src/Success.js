import {useState, useRef} from 'react';
import axios from 'axios';
import {Col, Row, Alert, Button, Container, Form} from 'react-bootstrap';

const Success = ()=>{
	const rName = useRef();
	const rCompany = useRef();
	const rPkg = useRef();

	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [pkg, setPkg] = useState('');
	const [msg, setMsg] = useState('');
	const [err, setErr] = useState('');

	const hName = (e)=>{setName(e.target.value)};
	const hCompany = (e)=>{setCompany(e.target.value)};
	const hPkg = (e)=>{setPkg(e.target.value)};

	const hForm = async(e)=>{
		e.preventDefault();
		
		if(name === ''){
			setErr('Name field cannot be empty.');
			rName.current.focus();
			setMsg('');
			return;
		}
		if(company === ''){
			setErr('Company field cannot be empty.');
			rCompany.current.focus();
			setMsg('');
			return;
		}
		if(pkg === ''){
			setErr('Package field cannot be empty.');
			rPkg.current.focus();
			setMsg('');
			return;
		}

		setErr('');
		const data = {name, company, pkg};
		try{
			const responce = await axios.post('http://localhost:5000/save', data)
			setMsg('Data save successful')
			console.log(responce.data)
			setName('');
			setPkg('');
			setCompany('');
		}catch(err){
			setErr('Error is : ' + err);
			console.error("Error is : ", err);
		}
	}

return(
	<Container>
		<Row className = 'justify-content-center bg-primary bg-gradient rounded text-light'>
			<Col>
				<Form onSubmit = {hForm} className = 'm-3'>
				<h2>Success Story App</h2>
					<Form.Group className = 'm-3'>
						<Form.Control type = 'text' placeholder = 'Enter name' ref = {rName} onChange = {hName} value = {name}></Form.Control>
					</Form.Group>
					<Form.Group className = 'm-3'>
						<Form.Control type = 'text' placeholder = 'Enter company name' ref = {rCompany} onChange = {hCompany} value = {company}></Form.Control>
					</Form.Group>
					<Form.Group className = 'm-3'>
						<Form.Control type = 'number' placeholder = 'Enter package' ref = {rPkg} onChange = {hPkg} value = {pkg}></Form.Control>
					</Form.Group>
					<Button type = 'submit' variant = 'light' className = 'text-dark'>Save</Button>
				</Form>
				{err && <Alert variant = 'danger'>{err}</Alert>}
				{msg && !err && <Alert variant = 'success'>{msg}</Alert>}
			</Col>
		</Row>
	</Container>
)
}

export default Success; 