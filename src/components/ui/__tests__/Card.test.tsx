import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-white', 'dark:bg-neutral-800'); // elevated variant
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('border-2');

    rerender(<Card variant="filled">Filled</Card>);
    expect(screen.getByText('Filled')).toHaveClass('bg-neutral-50');

    rerender(<Card variant="unstyled">Unstyled</Card>);
    expect(screen.getByText('Unstyled')).not.toHaveClass('bg-white');
  });

  it('applies different padding sizes', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding')).not.toHaveClass('p-4');

    rerender(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText('Small padding')).toHaveClass('p-4');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText('Large padding')).toHaveClass('p-8');
  });

  it('applies different border radius', () => {
    const { rerender } = render(<Card radius="none">No radius</Card>);
    expect(screen.getByText('No radius')).not.toHaveClass('rounded-lg');

    rerender(<Card radius="sm">Small radius</Card>);
    expect(screen.getByText('Small radius')).toHaveClass('rounded-sm');

    rerender(<Card radius="xl">Large radius</Card>);
    expect(screen.getByText('Large radius')).toHaveClass('rounded-xl');
  });

  it('handles interactive state correctly', () => {
    const handleClick = jest.fn();
    render(
      <Card interactive onClick={handleClick}>
        Interactive card
      </Card>
    );

    const card = screen.getByText('Interactive card');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Card onClick={handleClick}>
        Clickable card
      </Card>
    );

    await user.click(screen.getByText('Clickable card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation for interactive cards', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        Keyboard card
      </Card>
    );

    const card = screen.getByText('Keyboard card');
    
    // Test Enter key
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(card, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>);
    expect(screen.getByText('Custom card')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card Sub-components', () => {
  it('renders CardHeader correctly', () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>
    );
    
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5');
  });

  it('renders CardTitle correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    );
    
    const title = screen.getByText('Card Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('text-lg', 'font-semibold');
  });

  it('renders CardDescription correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
      </Card>
    );
    
    const description = screen.getByText('Card description');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-sm', 'text-neutral-600');
  });

  it('renders CardContent correctly', () => {
    render(
      <Card>
        <CardContent>Main content</CardContent>
      </Card>
    );
    
    const content = screen.getByText('Main content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('pt-0');
  });

  it('renders CardFooter correctly', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );
    
    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'items-center', 'pt-0');
  });

  it('renders complete card composition', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies custom className to sub-components', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-desc">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title').parentElement).toHaveClass('custom-header');
    expect(screen.getByText('Title')).toHaveClass('custom-title');
    expect(screen.getByText('Description')).toHaveClass('custom-desc');
    expect(screen.getByText('Content')).toHaveClass('custom-content');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });
});
