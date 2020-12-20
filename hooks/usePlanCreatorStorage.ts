import { useEffect, useState } from 'react';
import { CellType, Plan, PlanCell, Size } from 'types/Types';

export function usePlanCreatorStorage(): [
  Plan,
  Size,
  (plan: Plan, size: Size) => void
] {
  const defaultCell: PlanCell = {
    type: CellType.cell
  };
  const defaultSize: Size = {
    x: 10,
    y: 10
  };
  const [size, setSize] = useState<Size>(defaultSize);
  const [plan, setPlan] = useState<Plan>(
    Array(defaultSize.y).fill(Array(defaultSize.x).fill({ ...defaultCell }))
  );

  useEffect(() => {
    const storedPlanSettings = localStorage.getItem('creator');
    const planSettings = storedPlanSettings && JSON.parse(storedPlanSettings);
    if (planSettings) {
      setPlan(planSettings.plan);
      setSize(planSettings.size);
    }
  }, []);

  const storePlan = (plan: Plan, size: Size) => {
    const storedPlan = localStorage.getItem('creator');
    const parsedPlan = storedPlan && JSON.parse(storedPlan);
    localStorage.setItem(
      'creator',
      JSON.stringify({
        ...parsedPlan,
        plan: plan,
        size: size
      })
    );
  };

  return [plan, size, storePlan];
}
