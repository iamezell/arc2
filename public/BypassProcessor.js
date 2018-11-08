class BypassProcessor extends AudioWorkletProcessor {
    constructor () {
        super()
    }

    process (inputs, outputs, parameters) {
      // Single input, single channel.
        let input = inputs[0];
        let output = outputs[0];
        // output[0].set(input[0]);
      // Process only while there are inputs.
        //alert(input);
        //alert(output);
        for (let channel = 0; channel < output.length; ++channel) {
            output[channel].set(input[channel]);
          }
        console.log('we in processor')
      return true;
    }
}; 

registerProcessor('bypass-processor', BypassProcessor);