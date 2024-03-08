import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react-test-renderer'
import CreateExercise from '../src/pages/CreateExercise'

describe('CreateExercise')
