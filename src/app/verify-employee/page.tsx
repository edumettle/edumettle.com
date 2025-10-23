import VerifyEmployeeClient from './VerifyEmployeeClient';

export const metadata = {
  title: 'Employee Verification - EduMettle',
  description: 'Verify employee credentials',
  robots: { index: false, follow: false }
};

export default function VerifyEmployeePage() {
  return <VerifyEmployeeClient />;
}
