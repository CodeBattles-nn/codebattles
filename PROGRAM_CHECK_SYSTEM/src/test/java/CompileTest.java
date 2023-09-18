import ru.doctorixx.core.structures.ProgramResult;
import ru.doctorixx.core.executors.CommandExecutor;
import ru.doctorixx.core.executors.PythonExecutor;

import java.io.IOException;

public class CompileTest {
    public static void main(String[] args) throws IOException {
        CommandExecutor executor = new PythonExecutor("hello.py", "C:\\Users\\jebpi\\IdeaProjects\\TestProject\\progs");

        ProgramResult result = executor.execute("1\n2");

        System.out.println(result.out());
        System.out.println(result.time() + "ms");

    }
}
