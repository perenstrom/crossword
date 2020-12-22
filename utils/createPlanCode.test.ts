import { Blank } from 'components/Blank';
import { CellType, DecoratorType, Plan, PlanCell, Size } from 'types/Types';
import { createPlanCode } from './createPlanCode';

const basicCell: PlanCell = {
  type: CellType.cell
};

const createBasicPlan = (size: Size): Plan =>
  Array(size.y)
    .fill(0)
    .map(() =>
      Array(size.x)
        .fill(0)
        .map(() => ({ ...basicCell }))
    );

describe('Create plan code', () => {
  it('Throws if not all rows are same length', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0].push({ ...basicCell });

    // Act
    const assertion = () => createPlanCode(plan);

    // Assert
    expect(assertion).toThrow('Plan invalid: rows are different lengths');
  });

  it('Returns size info at start', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCodeStart = 'w2h2';
    expect(result.substr(0, 4)).toEqual(expectedPlanCodeStart);
  });

  it('Returns correct plan code for non repeating basic cells', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][0].type = CellType.blank;
    plan[1][1].type = CellType.blank;

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCode = 'w2h2xonox';
    expect(result).toEqual(expectedPlanCode);
  });

  it('Returns correct plan code for non repeating word start cells', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][0].type = CellType.blank;
    plan[0][1].legend = 0;
    plan[1][1].type = CellType.blank;
    plan[1][0].legend = 0;

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCode = 'w2h2xanax';
    expect(result).toEqual(expectedPlanCode);
  });

  it('Returns correct plan code for non repeating basic cells with decorators', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][0].type = CellType.blank;
    plan[0][1].decorator = DecoratorType.htv;
    plan[1][1].type = CellType.blank;
    plan[1][0].decorator = DecoratorType.vth;

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCode = 'w2h2xornolx';
    expect(result).toEqual(expectedPlanCode);
  });

  it('Returns correct plan code for non repeating word start cells with decorators', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][0].type = CellType.blank;
    plan[0][1].legend = 0;
    plan[0][1].decorator = DecoratorType.htv;
    plan[1][1].type = CellType.blank;
    plan[1][0].legend = 0;
    plan[1][0].decorator = DecoratorType.vth;

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCode = 'w2h2xarnalx';
    expect(result).toEqual(expectedPlanCode);
  });

  it('Returns correct plan code for repeating basic cells', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[1][0].type = CellType.blank;
    plan[1][1].type = CellType.blank;
    const plan2 = createBasicPlan({ x: 3, y: 2 });
    plan2[1][0].type = CellType.blank;
    plan2[1][1].type = CellType.blank;
    plan2[1][2].type = CellType.blank;

    // Act
    const result = createPlanCode(plan);
    const result2 = createPlanCode(plan2);

    // Assert
    const expectedPlanCode = 'w2h2o2nx2';
    const expectedPlanCode2 = 'w3h2o3nx3';
    expect(result).toEqual(expectedPlanCode);
    expect(result2).toEqual(expectedPlanCode2);
  });

  it('Returns correct plan code for repeating word start cells', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][0].legend = 0;
    plan[0][1].legend = 0;
    plan[1][0].type = CellType.blank;
    plan[1][1].type = CellType.blank;
    const plan2 = createBasicPlan({ x: 3, y: 2 });
    plan2[0][0].legend = 0;
    plan2[0][1].legend = 0;
    plan2[1][0].type = CellType.blank;
    plan2[1][1].type = CellType.blank;
    plan2[1][2].type = CellType.blank;

    // Act
    const result = createPlanCode(plan);
    const result2 = createPlanCode(plan2);

    // Assert
    const expectedPlanCode = 'w2h2a2nx2';
    const expectedPlanCode2 = 'w3h2a2onx3';
    expect(result).toEqual(expectedPlanCode);
    expect(result2).toEqual(expectedPlanCode2);
  });

  it('Returns correct plan code for repeating basic cells with turns', () => {
    // Arrange
    const plan = createBasicPlan({ x: 2, y: 2 });
    plan[0][1].decorator = DecoratorType.htv;
    plan[1][0].type = CellType.blank;
    plan[1][1].type = CellType.blank;
    const plan2 = createBasicPlan({ x: 3, y: 2 });
    plan2[0][0].decorator = DecoratorType.htv;
    plan2[1][0].type = CellType.blank;
    plan2[1][1].type = CellType.blank;
    plan2[1][2].type = CellType.blank;

    // Act
    const result = createPlanCode(plan);
    const result2 = createPlanCode(plan2);

    // Assert
    const expectedPlanCode = 'w2h2oornx2';
    const expectedPlanCode2 = 'w3h2oro2nx3';
    expect(result).toEqual(expectedPlanCode);
    expect(result2).toEqual(expectedPlanCode2);
  });

  it('Returns correct plan code for repeating turns (should not repeat)', () => {
    // Arrange
    const plan = createBasicPlan({ x: 3, y: 2 });
    plan[0][0].decorator = DecoratorType.htv;
    plan[0][1].decorator = DecoratorType.htv;
    plan[0][2].decorator = DecoratorType.htv;
    plan[1][0].type = CellType.blank;
    plan[1][1].type = CellType.blank;
    plan[1][2].type = CellType.blank;

    // Act
    const result = createPlanCode(plan);

    // Assert
    const expectedPlanCode = 'w3h2ororornx3';
    expect(result).toEqual(expectedPlanCode);
  });
});
