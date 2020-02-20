import { MemoryRouter } from 'react-router-dom';


export const wrapRouter = (component, route='/') => {
	return (props => (
		<MemoryRouter initialEntried={[route]}>
			component
		</MemoryRouter>
	))
}