import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import { fireEvent, render, cleanup } from '@testing-library/react'
