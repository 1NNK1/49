import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfile';

// Мокирование fetch
global.fetch = vi.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает индикатор загрузки', () => {
    fetch.mockReturnValue(new Promise(() => {})); // Запрос никогда не завершится
    render(<UserProfile />);
    expect(screen.getByTestId('loading').textContent).toBe('Загрузка...');
  });

  it('отображает данные пользователя при успехе', async () => {
    const mockUser = {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      address: { city: 'Киев' }
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByText(/Иван Иванов/i)).toBeInTheDocument();
    expect(screen.getByText(/ivan@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Киев/i)).toBeInTheDocument();
  });

  it('отображает ошибку при сбое запроса', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Ошибка при загрузке данных/i)).toBeInTheDocument();
  });
});
