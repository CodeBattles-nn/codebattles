import JSZip from "jszip";

const _processPolygonFile = async (file) => {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());

    const tests = []
    const inputData = {}
    const outputData = {}
    let config = {}

    for (const [filename, entry] of Object.entries(zip.files)) {
        if (!entry.dir) {
            let content = null;
            if (filename.endsWith('.json') || filename.startsWith("tests/")) {
                content = await entry.async('text');

                // Metadata json
                if (filename.endsWith('.json')) {
                    config = JSON.parse(content);
                }

                // Test answer (output)
                else if (filename.endsWith('.a')) {
                    const test_id = /tests\/(\d+)\.a/.exec(filename)
                    outputData[test_id[1]] = content;
                }

                // Test input
                else {
                    const test_id = /tests\/(\d+)/.exec(filename)
                    inputData[test_id[1]] = content;
                }
            }
        }
    }

    const tests_array = Object.keys(inputData).sort()
    tests_array.forEach(key => {
        tests.push(
            {
                "in": inputData[key].trim(),
                "out": outputData[key].trim(),
            }
        )
    })



    console.log(tests)

    const cblike = {}

    cblike.name = config.name;
    cblike.inData = config.input;
    cblike.outData = config.output;
    cblike.description = config.legend + "\n" + config.notes;

    cblike.tests = JSON.stringify(tests);
    cblike.examples = JSON.stringify([]);

    const examples = []

    config.sampleTests.forEach(example => {
        examples.push(
            {
                "in": example.input,
                "out": example.output,
            }
        )
    })

    cblike.examples = JSON.stringify(examples);

    return [polygonProcessStatuses.DONE, cblike]
}


export const processPolygonFile = async (file) => {
    try {
        return await _processPolygonFile(file);
    } catch (error) {
        console.error(error);
        return [polygonProcessStatuses.ERROR, {}]
    }
}

export const polygonProcessStatuses = {
    ERROR: 1,
    DONE: 2,
}