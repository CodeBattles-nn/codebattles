package ru.doctorixx.core.executors;

import ru.doctorixx.core.compilers.AbstractCompiler;

public class KumirExecutor extends CommandExecutor {


    public KumirExecutor(String filename, String directory) {
        super(filename, directory);
    }

    @Override
    protected String getRunCommand() {
        return "D:\\Kumir-2.1.0-rc10\\bin\\kumir2-xrun.exe";
    }

    @Override
    protected AbstractCompiler getCompiler() {
        return new KumirCompiler();
    }

    public static class KumirCompiler extends AbstractCompiler {

        @Override
        public String getCompileCommand() {
            return "D:\\Kumir-2.1.0-rc10\\bin\\kumir2-bc.exe";
        }

        @Override
        public String filenameModifyAfterComplete(String in) {
            return in.replace(".kum", ".kod");
        }
    }

    @Override
    public String mutateProgramBeforeRun(String program) {
        program = program.replaceAll("\\r\\n", "\n");
        program = program.replaceAll("\\r", "\n");
        return program;
    }
}
