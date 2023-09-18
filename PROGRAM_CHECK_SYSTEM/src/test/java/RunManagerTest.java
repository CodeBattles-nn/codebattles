import ru.doctorixx.core.ExecutionManager;
import ru.doctorixx.core.RunManager;
import ru.doctorixx.core.executors.PythonExecutor;
import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.structures.Test;

import java.util.ArrayList;
import java.util.List;

public class RunManagerTest {

    public static final String PROGRAM = """
            a = int(input())
            b = int(input())
            if a == -1:
                print("-1")
            if a == -2:
                raise Exception("a")
            if a == -3:
                while True:
                    print()
            print(a + b)
            """;

    public static void main(String[] args) {

        List<Test> tests = new ArrayList<>();

        tests.add(new Test("1\n1", "2"));
        tests.add(new Test("10\n1", "11"));
        tests.add(new Test("1\n1", "2"));
        tests.add(new Test("1\n3", "4"));
        tests.add(new Test("-1\n3", "2"));
        tests.add(new Test("-2\n3", "1"));
        tests.add(new Test("-3\n3", "0"));


        ExecutionManager executionManager = new ExecutionManager(new PythonExecutor("hello.py", "adir"), "", PROGRAM);
        RunManager runManager = new RunManager(executionManager);
        List<ProgramResult> results = runManager.test(tests);
        System.out.println();

        for (ProgramResult res: results) {
            System.out.println(res.msg() + " " + res.time() + "ms");
        }

        System.out.println(runManager.getSuccessTestCount() + "/" + runManager.getTestCount());
                
    }
}
